import * as React from 'react';
import { Button } from '@ui5/webcomponents-react/Button';
import { SearchHelpDialog } from './search-help-dialog';

interface UserSearchHelpBarProps {
  onFilterChange: (filter: string) => void;
}

export function UserSearchHelpBar({ onFilterChange }: UserSearchHelpBarProps) {
  const [resetKey, setResetKey] = React.useState(0);
  const [userNameFilterString, setUserNameFilterString] = React.useState('');
  const [roleFilterString, setRoleFilterString] = React.useState('');
  const [createdByFilterString, setCreatedByFilterString] = React.useState('');

  const combinedFilter = React.useMemo(() => {
    return [userNameFilterString, roleFilterString, createdByFilterString].filter(Boolean).join(' and ');
  }, [createdByFilterString, roleFilterString, userNameFilterString]);

  React.useEffect(() => {
    onFilterChange(combinedFilter);
  }, [combinedFilter, onFilterChange]);

  const clearFilters = () => {
    setUserNameFilterString('');
    setRoleFilterString('');
    setCreatedByFilterString('');
    setResetKey((prev) => prev + 1);
    onFilterChange('');
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-700">Search Help</div>
        <Button design="Transparent" onClick={clearFilters}>
          Clear  
        </Button>
      </div>
      <div className="grid gap-3 xl:grid-cols-3">
        <SearchHelpDialog
          key={`user-name-${resetKey}`}
          label="User Name"
          field="Uname"
          placeholder="Search by user name"
          afterFilterStringBuild={setUserNameFilterString}
        />
        <SearchHelpDialog
          key={`role-${resetKey}`}
          label="Role"
          field="Role"
          placeholder="Search by role"
          afterFilterStringBuild={setRoleFilterString}
        />
        <SearchHelpDialog
          key={`created-by-${resetKey}`}
          label="Created By"
          field="Ernam"
          placeholder="Search by creator"
          afterFilterStringBuild={setCreatedByFilterString}
        />
      </div>
    </div>
  );
}
