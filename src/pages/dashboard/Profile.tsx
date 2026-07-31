import { Avatar } from "@/components/Avatar/Avatar";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import { Button } from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { TextInput } from "@/components/TextInput/TextInput";
import { properties } from "@/data";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Camera,
  DoorClosed,
  Edit3,
  MapPin,
  Mail,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be 80 characters or less"),
});

type EditProfileForm = z.infer<typeof editProfileSchema>;

const cityTotals = properties.reduce<Record<string, number>>((totals, item) => {
  const city = item.addressLine2.split(",").at(-1)?.trim() || "Unknown";
  totals[city] = (totals[city] ?? 0) + 1;
  return totals;
}, {});

const topCities = Object.entries(cityTotals)
  .map(([city, total]) => ({ city, total }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 5);

const totalUnits = properties.reduce((sum, item) => sum + item.units, 0);
const occupiedUnits = properties.reduce((sum, item) => sum + item.occupied, 0);
const vacantUnits = properties.reduce((sum, item) => sum + item.vacant, 0);

const stats = [
  {
    label: "Total tenants",
    value: occupiedUnits,
    icon: Users,
    className: "bg-[#D5EFF2] text-[#167589]",
  },
  {
    label: "Occupied units",
    value: occupiedUnits,
    icon: DoorClosed,
    className: "bg-[#DFF8EA] text-[#17A867]",
  },
  {
    label: "Vacant units",
    value: vacantUnits,
    icon: DoorClosed,
    className: "bg-[#FFE3E3] text-[#E5484D]",
  },
  {
    label: "Total properties",
    value: properties.length,
    icon: Building2,
    className: "bg-[#E7EFF8] text-[#173B67]",
  },
  {
    label: "Total units",
    value: totalUnits,
    icon: DoorClosed,
    className: "bg-[#FFF3D6] text-[#C58A12]",
  },
];

const formatJoinDate = (createdAt?: string) => {
  if (!createdAt) {
    return "Registered July 2026";
  }

  return `Registered ${new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt))}`;
};

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const updateProfile = useUpdateProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState<string | null>(
    user?.avatarUrl ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullName = user?.fullName || "Raymond Agu";
  const email = user?.email || "raymondagu@gmail.com";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName,
    },
  });

  const openEditProfile = () => {
    reset({
      fullName,
    });
    setAvatarDraft(user?.avatarUrl ?? null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsEditOpen(true);
  };

  const closeEditProfile = () => {
    setIsEditOpen(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile picture must be 2MB or less.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarDraft(typeof reader.result === "string" ? reader.result : null);
    };

    reader.onerror = () => {
      toast.error("Unable to load this profile picture.");
    };

    reader.readAsDataURL(file);
  };

  const removeAvatarDraft = () => {
    setAvatarDraft(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditProfile = async (input: EditProfileForm) => {
    const nextFullName = input.fullName.trim();

    if (nextFullName.length < 2) {
      toast.error("Full name must be at least 2 characters");
      return;
    }

    try {
      const response = await updateProfile.mutateAsync({
        fullName: nextFullName,
      });

      setUser({
        ...response.data,
        avatarUrl: avatarDraft,
      });
      toast.success("Profile updated successfully");
      setIsEditOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update profile";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">
          Profile
        </h1>

        <div className="flex items-center gap-4">
          <NotificationButton />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10 min-w-[132px] gap-2"
            onClick={openEditProfile}
          >
            <Edit3 size={15} />
            Edit Profile
          </Button>
        </div>
      </div>

      <section className="rounded-2xl border border-[#DDE6EC] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#EEF2F5] pb-6 sm:flex-row sm:items-center">
          <Avatar
            fullname={fullName}
            src={user?.avatarUrl}
            size="xl"
            className="ring-4 ring-[#EAF3F7]"
          />

          <div>
            <h2 className="text-2xl font-semibold text-[#111827]">
              {fullName}
            </h2>
            <p className="mt-1 text-sm text-[#667085]">Landlord</p>
            <p className="mt-1 text-sm text-[#98A2B3]">
              {formatJoinDate(user?.createdAt)} · {properties.length} property
              added
            </p>
          </div>
        </div>

        <div className="grid gap-6 py-6 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="rounded-2xl border border-[#E5EAF0] p-5">
            <h3 className="text-xl font-medium text-[#111827]">
              Personal Info
            </h3>

            <dl className="mt-5 space-y-6">
              <div>
                <dt className="text-sm font-semibold text-[#167589]">Name</dt>
                <dd className="mt-1 text-sm font-medium text-[#111827]">
                  {fullName}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-[#167589]">Email</dt>
                <dd className="mt-1 text-sm font-medium text-[#111827]">
                  {email}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-[#E5EAF0] p-5">
            <h3 className="text-xl font-medium text-[#111827]">
              Portfolio summary
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.slice(0, 3).map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 shadow-sm"
                  >
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-lg ${item.className}`}
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-3xl font-medium leading-none text-[#111827]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-[#667085]">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {stats.slice(3).map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-4 shadow-sm"
                  >
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-lg ${item.className}`}
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-3xl font-medium leading-none text-[#111827]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-[#667085]">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <h3 className="text-base font-semibold text-[#111827]">
            Top 5 Cities
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topCities.map((item) => (
              <div key={item.city} className="rounded-xl bg-[#F8FAFC] p-4">
                <p className="text-xl font-medium text-[#111827]">
                  {item.city}
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  {item.total} {item.total === 1 ? "Property" : "Properties"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h3 className="text-base font-semibold text-[#111827]">
            Top Properties
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <article
                key={property.name}
                className="rounded-xl border border-[#AFC8D5] bg-white p-4"
              >
                <h4 className="text-lg font-semibold text-[#111827]">
                  {property.name}
                </h4>
                <p className="mt-2 flex items-start gap-2 text-xs text-[#667085]">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>
                    {property.addressLine1}, {property.addressLine2}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <Modal
        open={isEditOpen}
        onOpenChange={(open) => {
          if (open) {
            openEditProfile();
            return;
          }

          closeEditProfile();
        }}
        title="Edit Profile"
        description="Update your profile details and picture."
        width="520px"
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={closeEditProfile}
              disabled={updateProfile.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-profile-form"
              isLoading={updateProfile.isPending}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <form
          id="edit-profile-form"
          className="space-y-5"
          onSubmit={handleSubmit(handleEditProfile)}
        >
          <div className="flex flex-col gap-4 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center">
            <Avatar
              fullname={fullName}
              src={avatarDraft}
              size="lg"
              className="ring-4 ring-white"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold text-[#111827]">
                Profile picture
              </p>
              <p className="mt-1 text-xs text-[#667085]">
                JPG or PNG, up to 2MB.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={updateProfile.isPending}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={15} />
                  Change Photo
                </Button>
                {avatarDraft && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-[#B42318] hover:bg-[#FEF3F2]"
                    disabled={updateProfile.isPending}
                    onClick={removeAvatarDraft}
                  >
                    <Trash2 size={15} />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          <TextInput
            label="Full name"
            required
            icon={<User size={16} />}
            placeholder="Enter full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <TextInput
            label="Email"
            icon={<Mail size={16} />}
            value={email}
            readOnly
            className="cursor-not-allowed bg-[#F8FAFC] text-[#667085]"
          />

          <p className="text-xs text-[#667085]">
            Email is locked and cannot be changed from profile settings.
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
