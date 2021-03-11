//const MAIN_LINK = "http://13.72.74.28:8080";
const MAIN_LINK = "http://localhost:8080";

export const ADMIN_AUTHENTICATE_LINK = MAIN_LINK + "/authenticate";
export const ADMIN_CREATE_NOTICE =
  MAIN_LINK + "/admin/noticeBoard/v1/createNewNotice";
export const ADMIN_UPDATE_NOTICE =
  MAIN_LINK + "/admin/noticeBoard/v1/updateExistentNotice";
export const ADMIN_DELETE_NOTICE =
  MAIN_LINK + "/admin/noticeBoard/v1/deleteExistentNotice";
export const ADMIN_CURRENT_NOTICES =
  MAIN_LINK + "/admin/noticeBoard/v1/getCurrentNotices?pageNumber=";
export const ADMIN_SEARCH_NOTICES =
  MAIN_LINK + "/admin/noticeBoard/v1/searchNotices?searchQuery=";

export const ADMIN_UPLOAD_IMAGE =
  MAIN_LINK + "/admin/noticeBoard/v1/imageController/noticeImage";
export const ADMIN_GET_IMAGE = MAIN_LINK + "/admin/noticeBoard/v1";
export const ADMIN_DELETE_IMAGE = MAIN_LINK + "/admin/noticeBoard/v1";
export const CURRENT_NOTICES =
  MAIN_LINK + "/viewer/noticeBoard/v1/getCurrentNotices?pageNumber=";
export const SEARCH_NOTICES =
  MAIN_LINK + "/viewer/noticeBoard/v1/searchNotices?searchQuery=";

export const VIEW_IMAGE = MAIN_LINK + "/viewer/noticeBoard/v1";
