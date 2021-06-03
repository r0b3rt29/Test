using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Models;
using Test.ViewModels;

namespace Test.Implementations.IServices
{
    public interface IUserManagement
    {
        Task<bool> CreateUser(RegisterViewModel model);
        Task<string> LogInUser(LoginViewModel model);
        Task<IEnumerable<UserTb>> GetAllUsers();
        Task<UserTb> GetThisUser(int userId);
        Task<bool> EditUser(int userId, UserTb user);
        Task<bool> DeleteUser(int userId);
        
    }
}
