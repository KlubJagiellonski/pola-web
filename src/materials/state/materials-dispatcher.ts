import { Dispatch } from "redux";
import { loadMaterials } from "./materials-reducer";
import { IPolaState } from "@App/state";
import { IMaterial } from "materials";

export const materialsDispatcher = {
  loadMaterials: (gatsbyNodes: IMaterial[]) => async (
    dispatch: Dispatch,
    getState: () => IPolaState
  ) => {
    const materials = gatsbyNodes;

    await dispatch(loadMaterials(materials));
  },
};
