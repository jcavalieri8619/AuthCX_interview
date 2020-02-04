using System.Collections.Generic;
using AuthCX.Models;

namespace AuthCX.Services.User
{
    public interface IUserService
    {
        IEnumerable<UserInfo> GetUserRecords();
        IEnumerable<UserInfo> GetUserRecords(string userId);
    }
}