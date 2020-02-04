namespace AuthCX.Models
{
    public class UserInfo : IUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Id { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public override string ToString()
        {
            return
                $"{nameof(FirstName)}: {FirstName}, {nameof(LastName)}: {LastName}, {nameof(Id)}: {Id}, {nameof(PhoneNumber)}: {PhoneNumber}, {nameof(UserName)}: {UserName}, {nameof(Email)}: {Email}";
        }
    }
}