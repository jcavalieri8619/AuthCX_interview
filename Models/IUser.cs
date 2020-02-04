namespace AuthCX.Models
{
    public interface IUser
    {
        string FirstName { get; set; }
        string LastName { get; set; }
        string Id { get; set; }
        string PhoneNumber { get; set; }
        string UserName { get; set; }
        string Email { get; set; }
        
    }
}