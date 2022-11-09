import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
  BuilderApiService,
  // BaseApiService,
} from "@/services/api.service";

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.BUILDER]: new BuilderApiService(resources.BUILDER, notifier),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("auth/getMe");
};

export const normalizeAdditionalItems = (item) => {
  return {
    ...item,
    count: 0,
  };
};

export const normalizeItems = (item) => {
  return {
    ...item,
    label: "",
  };
};

export const normalizeIngredientsItems = (item) => {
  return {
    ...item,
    count: 0,
    label: item.image.replace(".svg", "").replace("/public/img/filling/", ""),
  };
};

export const getItemById = (list, id) => {
  return list.find((item) => item.id === id);
};
