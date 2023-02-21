enum OrderStatus {
    draft = "draft",
    listed = "listed",
    list = "listed",
    unlisted = "unlisted",
    unlist = "unlisted",
}
enum InquiryStatus {
    open = "open",
    resolved = "resolved",
    booked = "booked",
    cancel = "cancel",
}
enum InquiryColor {
    open = "#FF9100",
    resolved = "#32CD32",
    booked = "#343A40",
    cancel = "#FF0000",
}
enum OrderColor {
    draft = "#FF9100",
    listed = "#32CD32",
    unlisted = "#FF0000",
}
enum EditType {
    details = "details",
    price = "price",
    rules = "rules",
}
export default {
    OrderStatus,
    OrderColor,
    InquiryStatus,
    InquiryColor,
    EditType,
}