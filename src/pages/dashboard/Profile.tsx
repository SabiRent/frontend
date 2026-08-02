import { Avatar } from "@/components/Avatar/Avatar";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import { Button } from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { TextInput } from "@/components/TextInput/TextInput";
import { properties } from "@/data";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useUploadUserAvatar } from "@/hooks/useUploadUserAvatar";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Camera,
  DoorClosed,
  Edit3,
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

const topCities = [
  { city: "Abuja", total: 8 },
  { city: "Lagos", total: 6 },
  { city: "Enugu", total: 5 },
  { city: "Asaba", total: 4 },
  { city: "PH", total: 4 },
];

const topProperties = [
  {
    name: "Prince & Princess",
    address: "No 12 Gregory Road, Emene, Enugu",
  },
  {
    name: "Sunshine Apartments",
    address: "12 Palm Street, Gbagada, Lagos",
  },
  {
    name: "Emerald Court",
    address: "15 Bank Road Wuse Zone 4, Abuja",
  },
];

const totalUnits = properties.reduce((sum, item) => sum + item.units, 0);
const occupiedUnits = properties.reduce((sum, item) => sum + item.occupied, 0);
const vacantUnits = properties.reduce((sum, item) => sum + item.vacant, 0);

const stats = [
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
  const uploadUserAvatar = useUploadUserAvatar();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState<string | null>(
    user?.avatarUrl ?? null,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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
    setAvatarFile(null);

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

    setAvatarFile(file);

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
    setAvatarFile(null);

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

      const updatedUser = avatarFile
        ? await uploadUserAvatar.mutateAsync(avatarFile)
        : response.data;

      setUser(updatedUser);
      toast.success("Profile updated successfully");
      setIsEditOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update profile";
      toast.error(message);
    }
  };

  const isSavingProfile = updateProfile.isPending || uploadUserAvatar.isPending;

  return (
    <div className="mx-auto w-full max-w-[1050px] space-y-5 pb-8">
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold tracking-tight text-[#031316]">
          Profile
        </h1>

        <div className="flex items-center justify-end gap-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 min-w-[150px] gap-2 border-[#167589] text-[#167589]"
            onClick={openEditProfile}
          >
            <Edit3 size={16} />
            Edit Profile
          </Button>
          <NotificationButton />
        </div>
      </div>

      <section className="rounded-xl border border-[#C7D1DA] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 border-b border-[#EEF2F5] px-1 pb-5 sm:flex-row sm:items-center">
          <div className="relative w-fit">
            <Avatar
              fullname={fullName}
              src={user?.avatarUrl}
              size="xl"
              className="ring-4 ring-[#EAF3F7]"
            />
            <button
              type="button"
              aria-label="Edit profile picture"
              className="absolute bottom-0 right-0 inline-flex size-8 items-center justify-center rounded-full border border-[#167589] bg-white text-[#167589] shadow-sm transition hover:bg-[#EAF6F8]"
              onClick={openEditProfile}
            >
              <Edit3 size={15} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#031316]">
              {fullName}
            </h2>
            <p className="mt-1 text-sm text-[#667085]">Landlord</p>
            <p className="mt-1 text-sm text-[#98A2B3]">
              {formatJoinDate(user?.createdAt)} <span className="mx-3" />
              {properties.length} property added
            </p>
          </div>
        </div>

        <section className="mt-6 rounded-xl border border-[#E5EAF0] px-4 py-3 shadow-sm">
          <h3 className="text-2xl font-medium text-[#1F2937]">Personal Info</h3>

          <dl className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-20">
            <div>
              <dt className="text-base font-medium text-[#167589]">Name</dt>
              <dd className="mt-1 text-base font-medium text-[#111827]">
                {fullName}
              </dd>
            </div>

            <div className="sm:min-w-[260px]">
              <dt className="text-base font-medium text-[#167589]">Email</dt>
              <dd className="mt-1 text-base font-medium text-[#111827]">
                {email}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-7 rounded-xl border border-[#F4D8A7] px-4 py-3 shadow-sm">
          <h3 className="text-2xl font-medium text-[#667085]">
            Portfolio summary
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-h-[82px] items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
                >
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg ${item.className}`}
                  >
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="text-3xl font-medium leading-none text-[#3C4A4E]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs text-[#98A2B3]">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 space-y-4 px-2">
          <h3 className="text-base font-semibold text-[#111827]">
            Top 5 Cities
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {topCities.map((item, index) => (
              <div
                key={item.city}
                className={`min-h-[72px] rounded-lg border border-[#E5EAF0] bg-white p-3 shadow-sm ${
                  index < 2 || index >= topCities.length - 2
                    ? "border-t-2 border-t-[#C9B7BF]"
                    : "border-t-transparent"
                }`}
              >
                <p className="text-2xl font-medium leading-tight text-[#1F2937]">
                  {item.city}
                </p>
                <p className="mt-2 text-xs text-[#667085]">
                  {item.total} {item.total === 1 ? "Property" : "Properties"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-4 rounded-lg bg-white px-2 pb-1">
          <h3 className="text-base font-semibold text-[#111827]">
            Top Properties
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {topProperties.map((property) => (
              <article
                key={property.name}
                className="rounded-lg border border-[#5D97AA] bg-white px-4 py-3"
              >
                <h4 className="text-lg font-semibold leading-tight text-[#111827]">
                  {property.name}
                </h4>
                <p className="mt-2 text-xs text-[#667085]">
                  {property.address}
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
              disabled={isSavingProfile}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-profile-form"
              isLoading={isSavingProfile}
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
                  disabled={isSavingProfile}
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
                    disabled={isSavingProfile}
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
