using System;
using System.Collections.Generic;
using System.Linq;
using AuthCX.Models;
using AuthCX.Repositories;

namespace AuthCX.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public IEnumerable<UserInfo> GetUserRecords()
        {
            return _userRepo.GetUserRecords();
        }

        public IEnumerable<UserInfo> GetUserRecords(string userId)
        {
            return GetUserRecords().Where(info => string.Equals(info.Id, userId, StringComparison.Ordinal));
        }
    }
}