using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace API.Data
{
    public class DataContext : IdentityDbContext<
        AppUser,
        AppRole,
        int, // identified using an int
        IdentityUserClaim<int>, // user claim will int as key
        AppUserRole,  // user role will be mapped to the joint table
        IdentityUserLogin<int>, // user login will int as key
        IdentityRoleClaim<int>, // role claim will int as key
        IdentityUserToken<int> // user token will int as key
        >
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // public DbSet<AppUser> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //configure the relationship between AppUser, AppRole through many2many relationship
            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(aur => aur.User)
                .HasForeignKey(aur => aur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(aur => aur.Role)
                .HasForeignKey(aur => aur.RoleId)
                .IsRequired();
        }
    }
}