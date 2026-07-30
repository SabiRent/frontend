import {
  Bell,
  CheckCheck,
  CircleDollarSign,
  Home,
  UserPlus,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

type NotificationCategory =
  | "All"
  | "Payments"
  | "Properties"
  | "Tenants"
  | "Maintenance";

type NotificationGroup = "Today" | "This Week" | "Earlier";

interface NotificationItem {
  id: string;
  category: Exclude<NotificationCategory, "All">;
  group: NotificationGroup;
  title: string;
  property: string;
  description: string;
  time: string;
  unread: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: "rent-payment-received",
    category: "Payments",
    group: "Today",
    title: "Rent Payment Received",
    property: "Flat 3B - Sunshine Apartments",
    description:
      "Chinedu Okafor has paid N850,000 for the annual rent.",
    time: "10 mins ago",
    unread: true,
  },
  {
    id: "maintenance-request",
    category: "Maintenance",
    group: "Today",
    title: "Maintenance Request",
    property: "Flat 5D - Maple Heights",
    description:
      "A new maintenance request for a leaking kitchen sink has been made.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "rent-due-soon",
    category: "Payments",
    group: "Today",
    title: "Rent Due soon!",
    property: "Flat 4A - Cedar Court",
    description: "Mrs Olajide Bunmi's rent is due in 2 weeks.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: "new-tenant-added",
    category: "Tenants",
    group: "This Week",
    title: "New Tenant Added",
    property: "Flat 8C - Emerald Court",
    description:
      "A new tenant Daniel Nwaeze has been added to your property.",
    time: "Yesterday 4:34PM",
    unread: false,
  },
  {
    id: "property-update",
    category: "Properties",
    group: "This Week",
    title: "Property Update!",
    property: "Flat 1D - Hillcrest Apartments",
    description: "This unit has been marked as vacant.",
    time: "Yesterday 10:23AM",
    unread: false,
  },
  {
    id: "rent-overdue",
    category: "Payments",
    group: "Earlier",
    title: "Rent Overdue",
    property: "Flat 2C - Sunshine Apartments",
    description: "Rent for this apartment is now overdue.",
    time: "Jul 22",
    unread: false,
  },
  {
    id: "property-inspection",
    category: "Properties",
    group: "Earlier",
    title: "Property Inspection Reminder",
    property: "Peace Estate",
    description: "Scheduled inspection is coming up this Friday.",
    time: "Jul 19",
    unread: false,
  },
  {
    id: "tenant-message",
    category: "Tenants",
    group: "Earlier",
    title: "Tenant Message",
    property: "Flat 6A - Maple Heights",
    description: "You have a new message from Amaka Johnson.",
    time: "Jul 18",
    unread: false,
  },
  {
    id: "maintenance-completed",
    category: "Maintenance",
    group: "Earlier",
    title: "Maintenance Completed",
    property: "Flat 5D - Maple Heights",
    description: "The leaking kitchen sink request has been resolved.",
    time: "Jul 16",
    unread: false,
  },
];

const categories: NotificationCategory[] = [
  "All",
  "Payments",
  "Properties",
  "Tenants",
  "Maintenance",
];

const groups: NotificationGroup[] = ["Today", "This Week", "Earlier"];

const categoryIcons = {
  Payments: CircleDollarSign,
  Properties: Home,
  Tenants: UserPlus,
  Maintenance: Wrench,
} satisfies Record<Exclude<NotificationCategory, "All">, typeof Bell>;

const iconStyles = {
  Payments: "bg-[#FFF6D7] text-[#D99A13]",
  Properties: "bg-[#FFECEB] text-[#D95B58]",
  Tenants: "bg-[#E7F3FA] text-[#3685A8]",
  Maintenance: "bg-[#F4F7FA] text-[#64748B]",
} satisfies Record<Exclude<NotificationCategory, "All">, string>;

const Notification = () => {
  const [activeCategory, setActiveCategory] =
    useState<NotificationCategory>("All");
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(notifications.filter((item) => !item.unread).map((item) => item.id)),
  );

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<NotificationCategory, number>>(
      (counts, category) => {
        counts[category] =
          category === "All"
            ? notifications.length
            : notifications.filter((item) => item.category === category).length;
        return counts;
      },
      {
        All: 0,
        Payments: 0,
        Properties: 0,
        Tenants: 0,
        Maintenance: 0,
      },
    );
  }, []);

  const visibleNotifications = notifications.filter(
    (item) => activeCategory === "All" || item.category === activeCategory,
  );

  const markAllAsRead = () => {
    setReadIds(new Set(notifications.map((item) => item.id)));
  };

  const markOneAsRead = (id: string) => {
    setReadIds((current) => new Set(current).add(id));
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] space-y-7 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">
          Notifications
        </h1>

        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-lg px-2 py-1 text-sm font-semibold text-[#167589] transition hover:bg-[#EAF6F8]"
          onClick={markAllAsRead}
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-4 rounded-xl bg-[#F8FAFC] p-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={`inline-flex min-w-[116px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#E8F7FA] text-[#167589] shadow-sm"
                    : "bg-white text-[#475467] hover:bg-[#F1F5F9]"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-white text-[#167589]"
                      : "bg-[#F1F5F9] text-[#667085]"
                  }`}
                >
                  {categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="rounded-2xl border border-[#E5EAF0] bg-white px-5 py-4 shadow-sm sm:px-7">
        {groups.map((group) => {
          const groupNotifications = visibleNotifications.filter(
            (item) => item.group === group,
          );

          if (!groupNotifications.length) return null;

          return (
            <div key={group} className="border-b border-[#EEF2F5] py-5 last:border-b-0">
              <h2 className="mb-4 text-base font-semibold text-[#344054]">
                {group}
              </h2>

              <div className="space-y-1">
                {groupNotifications.map((item) => {
                  const Icon = categoryIcons[item.category];
                  const isUnread = !readIds.has(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="grid w-full grid-cols-[44px_1fr] gap-4 rounded-xl px-2 py-4 text-left transition hover:bg-[#F8FAFC] sm:grid-cols-[44px_1fr_auto] sm:items-center"
                      onClick={() => markOneAsRead(item.id)}
                    >
                      <span
                        className={`inline-flex size-10 items-center justify-center rounded-full ${iconStyles[item.category]}`}
                      >
                        <Icon size={18} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[#111827]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-[#344054]">
                          {item.property}
                        </span>
                        <span className="mt-1 block text-sm text-[#667085]">
                          {item.description}
                        </span>
                      </span>

                      <span className="col-start-2 flex items-center gap-2 self-start whitespace-nowrap pt-1 text-sm font-semibold text-[#344054] sm:col-start-auto">
                        {item.time}
                        {isUnread && (
                          <span className="size-2 rounded-full bg-[#167589]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Notification;
