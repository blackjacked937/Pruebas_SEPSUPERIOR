import { IoWarning } from 'react-icons/io5';

export const cardClasses = (riskLevel) => {
  const level = Number(riskLevel) || 0;
  return `risk-card risk-level-${level} ${level > 0 ? 'risk-level-danger' : 'risk-level-0'}`;
};

export const getIcon = (riskLevel) => {
  return <IoWarning className="card-icon-navigation" />;
};