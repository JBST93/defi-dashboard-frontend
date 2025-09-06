import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
  showIcon?: boolean;
  tooltip?: boolean;
}

const riskConfig = {
  low: {
    label: 'Low Risk',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    icon: CheckCircleIcon,
    iconColor: 'text-green-600',
    description: 'Established protocol with high TVL and proven track record',
  },
  medium: {
    label: 'Medium Risk',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    icon: ExclamationCircleIcon,
    iconColor: 'text-yellow-600',
    description: 'Moderate risk with decent TVL or newer protocol',
  },
  high: {
    label: 'High Risk',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-red-600',
    description:
      'High risk due to low TVL, experimental features, or new protocol',
  },
};

export default function RiskBadge({
  risk,
  className = '',
  showIcon = true,
  tooltip = true,
}: RiskBadgeProps) {
  const config = riskConfig[risk];
  const Icon = config.icon;

  return (
    <div className="relative group">
      <span
        className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${config.bgColor} ${config.textColor} ${config.borderColor} border
          ${className}
        `}
        role="img"
        aria-label={`Risk level: ${config.label}`}
      >
        {showIcon && (
          <Icon
            className={`w-3 h-3 mr-1 ${config.iconColor}`}
            aria-hidden="true"
          />
        )}
        {config.label}
      </span>

      {tooltip && (
        <div
          className="
            absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
            px-3 py-2 bg-gray-900 text-white text-xs rounded-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none whitespace-nowrap z-10
            before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
            before:border-4 before:border-transparent before:border-t-gray-900
          "
          role="tooltip"
        >
          {config.description}
        </div>
      )}
    </div>
  );
}
