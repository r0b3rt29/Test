using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Implementations.IServices;
using Test.Models;
using Test.ViewModels;

namespace Test.Implementations.Services
{
    public class UserManagement : IUserManagement
    {
        private readonly UserContext _context;

        public UserManagement(UserContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateUser(RegisterViewModel model)
        {
            bool isSuccess = false;
            try
            {
                UserTb user = new UserTb();
                if (model.FirstName != null && model.LastName !=null && model.Email != null && model.Password != null && model.ConfirmPassword != null)
                {
                    if (model.Password == model.ConfirmPassword)
                    {
                        user.FirstName = model.FirstName;
                        user.LastName = model.LastName;
                        user.Email = model.Email;
                        user.Password = model.Password;

                        await _context.UserTbs.AddAsync(user);
                        await _context.SaveChangesAsync();

                        isSuccess = true;
                    }
                }
            }
            catch (Exception e)
            {

                throw new ApplicationException(e.Message);
            }
            return isSuccess;
        }

        public async Task<bool> DeleteUser(int userId)
        {
            bool isSuccess = false;
            try
            {
                var userTb = await _context.UserTbs.FindAsync(userId);
                if (userTb != null)
                {
                    _context.UserTbs.Remove(userTb);
                    await _context.SaveChangesAsync();

                    isSuccess = true;
                }

                
            }
            catch (Exception e)
            {

                throw new ApplicationException(e.Message);
            }
            return isSuccess;
        }

        public async Task<bool> EditUser(int userId, UserTb user)
        {
            bool isSuccess = false;

            try
            {
                if (userId == user.Id)
                {
                    _context.Entry(user).State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                    isSuccess = true;
                }
            }
            catch (Exception e)
            {

                throw new ApplicationException(e.Message);
            }

            return isSuccess;
        }

        public async Task<IEnumerable<UserTb>> GetAllUsers()
        {
            IEnumerable<UserTb> result = null;
            try
            {
                result = await _context.UserTbs.AsQueryable().ToListAsync();
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }
            return result;
        }

        public async Task<UserTb> GetThisUser(int userId)
        {
            UserTb result = null;
            try
            {
                result = await _context.UserTbs.FindAsync(userId);
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }

            return result;
        }

        public async Task<string> LogInUser(LoginViewModel model)
        {
            string member = string.Empty;
            try
            {
                var user = await _context.UserTbs.FirstOrDefaultAsync(e => e.Email == model.Email && e.Password == model.Password);
                if (user != null)
                {
                    if (user.Id == 1 )
                    {
                        member = "superadmin";
                    }
                    else
                    {
                        member = "member";
                    }
                }
            }
            catch (Exception e)
            {

                throw new ApplicationException(e.Message);
            }

            return member;

        }
    }
}
