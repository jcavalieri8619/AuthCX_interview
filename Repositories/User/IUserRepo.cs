using System.Collections.Generic;
using AuthCX.Models;

namespace AuthCX.Repositories
{
    public interface IUserRepo
    {
        IEnumerable<UserInfo> GetUserRecords();
    }
}