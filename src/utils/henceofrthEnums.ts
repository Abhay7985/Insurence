enum OrderStatus {
    placed = "PLACED",
    confirmed = "CONFIRMED",
    cancelled = "CANCELLED",
    delivered = "DELIVERED",
}
enum InputType {
    name = "NAME",
    address = "ADDRESS",
    email = "EMAIL",
    password = "PASSWORD",
    confirm_password = "CONFIRM_PASSWORD",
}
enum BookingTime {
    all = "ALL",
    upcoming = "UPCOMING",
    past = "PAST",
}
enum BookingType {
    all = "ALL",
    stays = "STAYS",
    experiences = "EXPERIENCES",
    onlineExperiences = "ONLINE_EXPERIENCES",
}
enum HostType {
    stays = "stays",
    experiences = "experiences",
    online_experiences = "online_experiences",
}
enum TransactionType {
    completed = "completed",
    upcoming = "upcoming"
}
enum ReservationsType {
    requested = "Requested",
    upcoming = "Upcoming",
    completed = "Completed",
    cancelled = "Cancelled",
    all = "All",
}
enum CounterData{
    countdata="countdata",
    counterdata="counterdata"
}
enum SocialLoginType{
    google="GOOGLE",
    facebook="FACEBOOK"
}
export default {
    OrderStatus,
    InputType,
    BookingTime,
    BookingType,
    CounterData,
    HostType,
    TransactionType,
    ReservationsType,
    SocialLoginType,
}