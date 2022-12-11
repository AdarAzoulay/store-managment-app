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
                opt=>{
                    opt.MapFrom(src=> src.Photos.FirstOrDefault(p=>p.IsMain).Url);
                }
            );

            CreateMap<OrderUpdateDto, Order>();

            CreateMap<RegisterDto, AppUser>();

        }
    }
}