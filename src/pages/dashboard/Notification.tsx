import {
  Bell,
  CheckCheck,
  CircleDollarSign,
  Home,
  Trash2,
  UserPlus,
  Wrench,
} from "lucide-react";
import { useMemo, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";

import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/hooks/useNotifications";
import type {
  NotificationCategory,
  NotificationItem,
} from "@/services/api/notification.service";

type NotificationCategoryFilter =
  | "All"
  | "Payments"
  | "Properties"
  | "Tenants"
  | "Maintenance";

type NotificationGroup = "Today" | "This Week" | "Earlier";

const categories: NotificationCategoryFilter[] = [
  "All",
  "Payments",
  "Properties",
  "Tenants",
  "Maintenance",
];

const groups: NotificationGroup[] = ["Today", "This Week", "Earlier"];

const apiCategoryByFilter = {
  Payments: "payments",
  Properties: "properties",
  Tenants: "tenants",
  Maintenance: "maintenance",
} satisfies Record<Exclude<NotificationCategoryFilter, "All">, NotificationCategory>;

const filterByApiCategory = {
  payments: "Payments",
  properties: "Properties",
  tenants: "Tenants",
  maintenance: "Maintenance",
} satisfies Record<NotificationCategory, Exclude<NotificationCategoryFilter, "All">>;

const categoryIcons = {
  Payments: CircleDollarSign,
  Properties: Home,
  Tenants: UserPlus,
  Maintenance: Wrench,
} satisfies Record<Exclude<NotificationCategoryFilter, "All">, typeof Bell>;

const iconStyles = {
  Payments: "bg-[#FFF6D7] text-[#D99A13]",
  Properties: "bg-[#FFECEB] text-[#D95B58]",
  Tenants: "bg-[#E7F3FA] text-[#3685A8]",
  Maintenance: "bg-[#F4F7FA] text-[#64748B]",
} satisfies Record<Exclude<NotificationCategoryFilter, "All">, string>;

const getNotificationGroup = (createdAt: string): NotificationGroup => {
  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return "Earlier";
  }

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfCreatedDate = new Date(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate(),
  );
  const dayDifference =
    (startOfToday.getTime() - startOfCreatedDate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (dayDifference === 0) {
    return "Today";
  }

  if (dayDifference <= 7) {
    return "This Week";
  }

  return "Earlier";
};

const formatNotificationTime = (createdAt: string) => {
  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return "";
  }

  const now = new Date();
  const minutesAgo = Math.max(
    0,
    Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60)),
  );

  if (minutesAgo < 1) {
    return "Just now";
  }

  if (minutesAgo < 60) {
    return `${minutesAgo} min${minutesAgo === 1 ? "" : "s"} ago`;
  }

  if (minutesAgo < 24 * 60) {
    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  }

  if (minutesAgo < 48 * 60) {
    return `Yesterday ${createdDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  return createdDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const Notification = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useNotifications({ page: 1, limit: 20 });
  const markOneAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const notifications = useMemo(
    () => data?.notifications ?? [],
    [data?.notifications],
  );
  const unreadNotifications = useMemo(
    () => notifications.filter((item) => !item.isRead),
    [notifications],
  );
  const [activeCategory, setActiveCategory] =
    useState<NotificationCategoryFilter>("All");

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<NotificationCategoryFilter, number>>(
      (counts, category) => {
        counts[category] =
          category === "All"
            ? notifications.length
            : notifications.filter(
                (item) => item.category === apiCategoryByFilter[category],
              ).length;
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
  }, [notifications]);

  const visibleNotifications = notifications.filter(
    (item) =>
      activeCategory === "All" ||
      item.category === apiCategoryByFilter[activeCategory],
  );

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate(undefined, {
      onSuccess: (response) => {
        toast.success(response.message || "All notifications marked as read.");
      },
      onError: () => {
        toast.error("Unable to mark all notifications as read.");
      },
    });
  };

  const markOneAsRead = (item: NotificationItem) => {
    if (item.isRead || markOneAsReadMutation.isPending) {
      return;
    }

    markOneAsReadMutation.mutate(item.id, {
      onError: () => {
        toast.error("Unable to mark this notification as read.");
      },
    });
  };

  const deleteOneNotification = (item: NotificationItem) => {
    deleteNotificationMutation.mutate(item.id, {
      onSuccess: (response) => {
        toast.success(response.message || "Notification deleted successfully.");
      },
      onError: () => {
        toast.error("Unable to delete this notification.");
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] space-y-7 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">
          Notifications
        </h1>

        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-lg px-2 py-1 text-sm font-semibold text-[#167589] transition hover:bg-[#EAF6F8] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={markAllAsRead}
          disabled={
            !unreadNotifications.length || markAllAsReadMutation.isPending
          }
        >
          <CheckCheck size={17} />
          {markAllAsReadMutation.isPending ? "Marking..." : "Mark all as read"}
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
        {isLoading && (
          <div className="py-16 text-center text-sm font-medium text-[#667085]">
            Loading notifications...
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm font-medium text-[#667085]">
              Unable to load notifications.
            </p>
            <button
              type="button"
              className="rounded-lg border border-[#167589] px-4 py-2 text-sm font-semibold text-[#167589] transition hover:bg-[#EAF6F8]"
              onClick={() => void refetch()}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && !visibleNotifications.length && (
          <div className="py-16 text-center text-sm font-medium text-[#667085]">
            {isFetching ? "Refreshing notifications..." : "No notifications yet."}
          </div>
        )}

        {!isLoading &&
          !isError &&
          groups.map((group) => {
            const groupNotifications = visibleNotifications.filter(
              (item) => getNotificationGroup(item.createdAt) === group,
            );

            if (!groupNotifications.length) return null;

            return (
              <div
                key={group}
                className="border-b border-[#EEF2F5] py-5 last:border-b-0"
              >
                <h2 className="mb-4 text-base font-semibold text-[#344054]">
                  {group}
                </h2>

                <div className="space-y-1">
                  {groupNotifications.map((item) => {
                    const category = filterByApiCategory[item.category];
                    const Icon = categoryIcons[category];
                    const isUnread = !item.isRead;

                    const handleKeyDown = (
                      event: KeyboardEvent<HTMLDivElement>,
                    ) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        markOneAsRead(item);
                      }
                    };

                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        className="grid w-full grid-cols-[44px_1fr] gap-4 rounded-xl px-2 py-4 text-left transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#167589]/30 sm:grid-cols-[44px_1fr_auto_auto] sm:items-center"
                        onClick={() => markOneAsRead(item)}
                        onKeyDown={handleKeyDown}
                      >
                        <span
                          className={`inline-flex size-10 items-center justify-center rounded-full ${iconStyles[category]}`}
                        >
                          <Icon size={18} />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[#111827]">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm font-semibold text-[#344054]">
                            {item.subtitle}
                          </span>
                          <span className="mt-1 block text-sm text-[#667085]">
                            {item.message}
                          </span>
                        </span>

                        <span className="col-start-2 flex items-center gap-2 self-start whitespace-nowrap pt-1 text-sm font-semibold text-[#344054] sm:col-start-auto">
                          {formatNotificationTime(item.createdAt)}
                          {isUnread && (
                            <span className="size-2 rounded-full bg-[#167589]" />
                          )}
                        </span>

                        <button
                          type="button"
                          aria-label={`Delete ${item.title}`}
                          className="col-start-2 inline-flex size-9 items-center justify-center justify-self-start rounded-lg border border-transparent text-[#98A2B3] transition hover:border-[#FEE4E2] hover:bg-[#FEF3F2] hover:text-[#D92D20] disabled:cursor-not-allowed disabled:opacity-50 sm:col-start-auto sm:justify-self-end"
                          disabled={deleteNotificationMutation.isPending}
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteOneNotification(item);
                          }}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
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
