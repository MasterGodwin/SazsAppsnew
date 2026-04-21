import React from "react";
import { IcMenu } from "./Icons";

interface Breadcrumb {
  label: string;
  onClick?: () => void;
}

interface SubHeaderProps {
  breadcrumbs: Breadcrumb[];
  onToggleSidebar: () => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  breadcrumbs,
  onToggleSidebar,
}) => {
  return (
    <div
      className="flex items-center h-10 bg-white border-b border-gray-300 shrink-0 z-40 px-4 gap-3"
      style={{ fontFamily: "'Amazon Ember','Helvetica Neue',Arial,sans-serif" }}
    >
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <IcMenu />
      </button>

      <div className="flex items-center gap-1 text-[13px]">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-gray-400 mx-0.5">›</span>}
            {i < breadcrumbs.length - 1 ? (
              <button className="text-[#0073bb] hover:underline font-medium">
                {crumb.label}
              </button>
            ) : (
              <span className="text-[#16191f] font-medium">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;