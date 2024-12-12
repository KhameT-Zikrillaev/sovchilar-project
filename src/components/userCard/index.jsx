import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserCard({ user }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusText = () => {
    if (user.maritalStatus === 'single') {
      return user.gender === 'male' ? 'Не женат' : 'Не замужем'
    } else if (user.maritalStatus === 'divorced') {
      return user.gender === 'male' ? 'В разводе, ищу жену' : 'В разводе'
    } else if (user.maritalStatus === 'widowed') {
      return user.gender === 'male' ? 'Вдовец' : 'Вдова'
    } else if (user.maritalStatus === 'married_second') {
      return 'Ищет вторую жену'
    }
  }

  const getStatusColor = () => {
    switch (user.maritalStatus) {
      case 'single':
        return 'bg-green-500'
      case 'divorced':
        return 'bg-amber-500'
      case 'widowed':
        return 'bg-gray-500'
      case 'married_second':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div 
      className={`
        bg-white rounded-2xl overflow-hidden
        transition-all duration-500 ease-out
        transform hover:-translate-y-2
        ${isHovered ? 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]' : 'shadow-lg'}
        h-[600px] flex flex-col relative
        hover:after:opacity-100 after:opacity-0
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-gradient-to-b after:from-transparent after:via-black/10 after:to-black/30
        after:transition-opacity after:duration-300
        border border-gray-100
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 overflow-hidden group">
        <img 
          src={user.image} 
          alt={user.name} 
          className={`
            w-full h-full object-cover
            transition-all duration-700 ease-out
            ${isHovered ? 'scale-110 blur-[2px]' : 'scale-100'}
            group-hover:saturate-[1.2]
          `}
        />
        {/* Статус отношений */}
        <div className={`
          absolute top-4 right-4 z-10
          transform transition-all duration-300
          ${isHovered ? 'translate-y-1 rotate-2' : ''}
        `}>
          <span className={`
            px-4 py-1.5 rounded-full text-sm font-medium
            ${getStatusColor()} text-white
            shadow-lg backdrop-blur-md bg-opacity-80
            border border-white/20
          `}>
            {getStatusText()}
          </span>
        </div>
        {/* Градиент и информация */}
        <div className={`
          absolute bottom-0 left-0 right-0
          bg-gradient-to-t from-black/95 via-black/70 to-transparent
          p-6 transform transition-all duration-500
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}
        `}>
          <div>
            <h3 className="text-white text-2xl font-bold mb-2 tracking-wide drop-shadow-lg">
              {user.name}, {user.age}
            </h3>
            <div className="flex items-center gap-3 text-gray-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium tracking-wide">{user.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`
        flex-1 p-7 flex flex-col justify-between
        transform transition-all duration-500
        ${isHovered ? 'bg-gradient-to-b from-white to-gray-50' : 'bg-white'}
        relative
      `}>
        <div className="space-y-4">
          <div className="flex items-center gap-1 border-b border-gray-100 pb-1">
            <span className="text-gray-500 font-medium">Религия:</span>
            <span className="font-semibold text-gray-800">{user.religion}</span>
          </div>
          <div className="flex items-center gap-1 border-b border-gray-100 pb-1">
            <span className="text-gray-500 font-medium">Национальность:</span>
            <span className="font-semibold text-gray-800">{user.nationality}</span>
          </div>
          <div className="flex items-center gap-1 border-b border-gray-100 pb-1">
            <span className="text-gray-500 font-medium">Образование:</span>
            <span className="font-semibold text-gray-800">{user.education}</span>
          </div>
          <p className="text-gray-600 line-clamp-3 leading-relaxed">{user.bio}</p>
        </div>
        
        <Link
          to={`/user/${user.id}`}
          className={`
          mt-6 w-full py-1.5 rounded-xl font-semibold text-white
          transform transition-all duration-300 block cursor-pointer
          ${isHovered 
            ? 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-500 shadow-lg scale-105 shadow-rose-500/30' 
            : 'bg-gradient-to-r from-rose-400 to-red-500'}
          hover:shadow-xl active:scale-95
          relative overflow-hidden z-50
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:translate-x-[-200%] hover:before:translate-x-[200%]
          before:transition-transform before:duration-700
          uppercase tracking-wide text-sm text-center
        `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}
