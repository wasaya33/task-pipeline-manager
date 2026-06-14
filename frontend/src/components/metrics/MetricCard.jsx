export default function MetricCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  description,
}) {
  const colorStyles = {
    blue: "border-l-primary bg-primary-light",
    green: "border-l-green-500 bg-green-50",
    orange: "border-l-accent bg-orange-50",
    purple: "border-l-purple-500 bg-purple-50",
    gray: "border-l-gray-500 bg-gray-50",
    red: "border-l-red-500 bg-red-50",
  };

  const textColorStyles = {
    blue: "text-primary",
    green: "text-green-600",
    orange: "text-accent",
    purple: "text-purple-600",
    gray: "text-gray-600",
    red: "text-red-600",
  };

  const resolvedColor = colorStyles[color] ? color : "blue";

  return (
    <div
      className={`card-base card-hover border-l-4 p-5 sm:p-6 ${
        colorStyles[resolvedColor]
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-gray-600 text-sm font-medium truncate">{title}</p>
          <p
            className={`text-3xl sm:text-4xl font-bold mt-2 ${
              textColorStyles[resolvedColor]
            }`}
          >
            {value}
          </p>
          {description && (
            <p className="text-gray-500 text-xs mt-2">{description}</p>
          )}
        </div>
        {Icon && (
          <div
            className={`p-3 rounded-lg flex-shrink-0 ${textColorStyles[resolvedColor]} opacity-20`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9">
              <Icon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
