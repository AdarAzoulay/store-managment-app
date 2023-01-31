using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {   // we want to map AppUser => MemberDto
            CreateMap<AppUser, MemberDto>();

            CreateMap<MemberUpdateDto, AppUser>();

            CreateMap<AppUser, MemberWithoutProductsDto>();

            CreateMap<Order, OrderDto>();

            CreateMap<Photo, PhotoDto>();

            CreateMap<Product, ProductDto>()
            .ForMember(
                dest => dest.PhotoUrl,
                opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                }
            );

            CreateMap<Product, ProductAdminDto>()
            .ForMember(
                dest => dest.PhotoUrl,
                opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                }
            ).ForMember(
                dest => dest.Userid,
                opt =>
                {
                    opt.MapFrom(src => src.AppUserId);
                }
            );

            CreateMap<AppUser, UserWithRolesDTO>()
            .ForMember(
                dest => dest.Roles,
                opt =>
                {
                    opt.MapFrom(src => src.UserRoles.Select(r => r.Role.Name).ToList());
                }
            ).ForMember(
                dest => dest.Userid,
                opt =>
                {
                    opt.MapFrom(src => src.Id);
                }
            );

            CreateMap<OrderUpdateDto, Order>();

            CreateMap<RegisterDto, AppUser>();

        }
    }
}