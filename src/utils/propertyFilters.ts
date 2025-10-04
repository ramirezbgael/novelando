export function resetPropertyFilters(
  setQuery?: (v: string) => void,
  setBeds?: (v: number) => void,
  setBaths?: (v: number) => void,
  setMinPrice?: (v: number) => void,
  setMaxPrice?: (v: number) => void,
  setParams?: (v: any) => void,
  setSelectedLocs?: (v: string[]) => void,
  setPropertyType?: (v: string) => void
) {
  setQuery?.('');
  setBeds?.(0);
  setBaths?.(0);
  setMinPrice?.(0);
  setMaxPrice?.(0);
  setParams?.({});
  setSelectedLocs?.([]);
  setPropertyType?.('');
  localStorage.removeItem('propertyFilters');
  localStorage.removeItem('propertyScroll');
}