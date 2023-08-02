import type { FilterType } from "~/services/queryService/types";
import type { SelectionType } from "../types";
import { usePlayFilterContext } from "~/contexts/playFilterContext";
import AddFilterButton from "../AddFilterButton";
import FilterToComponent from "../FilterToComponent";
import { Container } from "../pages/layout";

export default function FilterBar() {
  const { state, dispatch } = usePlayFilterContext();

  const addFilterButton = (selection: SelectionType) => {
    let filter: FilterType = {
      order: state.length + 1,
      filter: selection.value,
      label: selection.label,
      arg: "",
    };

    dispatch({
      type: "upsert",
      filter,
    });
  };

  return (
    <Container>
      <div className="flex flex-col flex-wrap gap-2 mb-8 filters sm:flex-row">
        {/* Filter components */}
        {state.slice(1).map((filter: FilterType) => {
          return <FilterToComponent key={filter.order} filter={filter} />;
        })}
        <AddFilterButton addFilterButton={addFilterButton} display={true} />
      </div>
    </Container>
  );
}
