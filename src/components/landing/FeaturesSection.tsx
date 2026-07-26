// import notification from "@/assets/icons/features/notification.svg";
// import tenantInfo from "@/assets/icons/features/tenant-info.svg";
// import maintenance from "@/assets/icons/features/maintenance.svg";
// import occupancy from "@/assets/icons/features/occupancy.svg";

// const FEATURES = [
//   {
//     icon: notification,
//     text: (
//       <>
//         <span className="font-semibold text-ink">Get Notified</span> about
//         due payments and important updates.
//       </>
//     ),
//   },
//   {
//     icon: tenantInfo,
//     text: (
//       <>
//         <span className="font-semibold text-ink">Keep Tenant</span>{" "}
//         Information organized and easy to access.
//       </>
//     ),
//   },
//   {
//     icon: maintenance,
//     text: (
//       <>
//         <span className="font-semibold text-ink">Tracks repairs</span> and
//         maintenance without losing request.
//       </>
//     ),
//   },
//   {
//     icon: occupancy,
//     text: (
//       <>
//         View <span className="font-semibold text-ink">Occupancy, payments,</span>{" "}
//         and property performance at a glance.
//       </>
//     ),
//   },
// ];

// export default function FeaturesSection() {
//   return (
//     <section className="bg-white px-6 py-16 -mt-36 bg-white">
//       <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
//         {/* Left: heading */}
//         <div>
//           <span className="text-sm font-semibold text-[rgb(22,117,137)]">
//             What We Give —
//           </span>
//           <h2 className="mt-3 text-3xl font-bold text-ink">
//             Best Features
//             <br />
//             For You
//           </h2>
//           <p className="mt-3 text-sm text-ink-muted">
//             Everything you need to manage properties smarter with less
//             stress
//           </p>
//         </div>

//         {/* Feature cards */}
//         {FEATURES.map((feature, index) => (
//           <div
//             key={index}
//             className="flex h-[159px] w-[166px] flex-col items-start gap-3 rounded-2xl border border-border bg-white px-4 py-4 shadow-sm"
//           >
//             <img src={feature.icon} alt="" className="h-10 w-10" />
//             <p className="text-sm text-ink-muted">{feature.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
