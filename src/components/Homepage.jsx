import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/image.svg';
import forward from '../images/forward.png';
import organize from '../images/organize.png';
import menu from '../images/menu.png';
import empower from '../images/empower.png';
import profile1 from '../images/profile1.jpg';
import profile2 from '../images/profile2.jpg';
import plus from '../images/plus.png';
import rArrow from '../images/rArrow.png';
import close from '../images/close.png';


function Homepage() {

    const [isMenuVisible, setVisible] = useState(false);

    const handleMenuClick = (e) => {
        e.preventDefault();
        setVisible((prevData) =>  !prevData);
    }


  return (
    <div className = "text-[#1e293b] m-0 p-0 flex flex-col max-h-screen w-screen">
        <nav className = {`px-5 py-2 ${isMenuVisible ? 'shadow-none' : 'shadow-[0_4px_4px_rgba(0,0,0,0.05)]'}`}>
            <div className = "flex justify-between items-center">

                <div className = "lg:w-[18%] md:w-[28%] w-[38%]">
                    <img src = {logo} alt="Logo" className = "object-cover" size = "6"/>
                </div>

                <div className = 'md:w-[7%] w-[10%] lg:hidden cursor-pointer mr-2' onClick = {handleMenuClick}>
                    <img src = {isMenuVisible ? close : menu} alt="Menu" className = 'object-cover'/>
                </div>

                <div className = "hidden lg:flex items-center justify-center gap-6 lg:mr-3 md:mr-12 mr-9 ">
                        <Link to = '/login' className = "font-semibold text-lg hover:text-[#633bc0] transition-colors duration-300">Login</Link>

                        <Link to = '/oauth' className = "text-sm bg-gradient-to-r from-[#633bc0] to-[#663bca] py-2 px-4 text-white rounded-lg hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#209971] transition-colors duration-300">Create an Account</Link>
                </div>

            </div>
        </nav>

        {isMenuVisible && 
            <div className="flex justify-center items-center relative">
                <div className="flex flex-col py-8 px-6 items-center justify-center absolute top-0 z-30 gap-5 bg-white w-full shadow-md border-b border-gray-200 rounded-b-3xl">
                    <Link to = "/login" className="font-semibold text-md hover:text-[#633bc0] transition-colors duration-200">
                    Login
                    </Link>
                    <Link to="/oauth" className="font-semibold text-md hover:text-[#633bc0] transition-colors duration-200">
                    Create an account
                    </Link>
                </div>
            </div>

        }

        <main className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex flex-col items-center">
            <div className = "flex flex-col justify-center items-center">

                <div className = 'max-w-max md:bg-[#f9f6ff] md:border-[1px] border-[#ede8fb] py-[8px] px-[8px] text-[#633bc0] font-semibold rounded-full flex gap-2 items-center text-sm flex-col md:flex-row'>

                    <div className = "max-w-min p-1 px-3 rounded-full bg-[white] md:border-[1px] md:border-[#ede8fb] flex gap-1 items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                        <div className = "w-6">
                            <img src = {organize} alt="Organize" className = "object-cover"/>
                        </div>
                        <div className = "">Organize</div>
                    </div>

                    <div className="bg-[#f9f6ff] border border-[#ede8fb] md:border-0 py-2 px-3 rounded-full text-center inline-flex flex-wrap justify-center items-center gap-1 leading-tight shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                        <span className="break-words">
                            Track, and complete tasks effortlessly with&nbsp;
                        </span>
                        <span className="inline-flex items-center">
                            <span className="whitespace-nowrap">Taskly</span>
                            <img src={forward}  alt="Forward" className="w-6 object-cover inline-block ml-2 md:ml-0" />
                        </span>
                    </div>

                </div>

                <div className = "lg:mt-8 md:mt-12 mt-10">
                    <div className = "">
                        <div className="relative font-bold md:text-4xl text-xl flex flex-wrap justify-center items-baseline lg:px-40 md:px-12 px-6 text-center">
                            <span>Empower</span>

                            <div className="p-1 rounded-full shadow-md lg:w-[3.5%] md:w-[4.5%] w-[6.5%] flex justify-center items-center mx-3 min-w-0">
                                <img src={empower} alt="Empower" className="object-cover" />
                            </div>

                            <span>yourself and your team</span>

                            <div className="rounded-full shadow-md lg:w-[3.5%] md:w-[4.5%] w-[6.5%] flex justify-center items-center ml-3 min-w-0 overflow-hidden aspect-square border-[0.5px] border-white">
                                <img src={profile1} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </div>

                            <div className="rounded-full bg-white shadow-md lg:w-[3.5%] md:w-[4.5%] w-[6.5%] flex justify-center items-center min-w-0 overflow-hidden aspect-square relative z-10 -ml-2 border-[0.5px] border-white">
                                <img src={profile2} alt="Profile"  className="w-full h-full object-cover rounded-full" />
                            </div>
                            
                            <div className="rounded-full bg-gradient-to-r from-[#d1d0d1] to-[#edf0f0] shadow-md lg:w-[3.5%] md:w-[4.5%] w-[6.5%] flex justify-center items-center mr-3 min-w-0 overflow-hidden aspect-square relative z-10 -ml-2 border-[0.5px] border-white">
                                <img src={plus} alt="plus" className="w-full h-full object-cover rounded-full" />
                            </div>

                            <span className="md:mt-2 mt-1 lg:leading-normal md:leading-snug leading-snug">
                                to collaborate and stay productive with <span className="relative inline-block after:content-[''] after:block after:w-[55%] after:h-[1.5px] after:bg-[#ad8cf8] after:mt-[0.1px]">
                                Task
                                </span>
                                <span className="text-[#10b981]">ly</span>.
                            </span>
                        </div>
                    </div>
                </div>

                <div className = "lg:px-72 md:px-16 px-6 text-center lg:mt-3 md:mt-6 mt-5">
                    <div className = " text-[#848485] font-sm">
                    Stay organized and boost productivity with Taskly. Easily manage tasks, track progress, and stay on top of your work—all in one place.
                    </div>
                </div>

                <div className = 'md:mt-10 mt-6'>
                    <Link to = '/oauth' className = "text-white bg-gradient-to-r from-[#633bc0] to-[#663bca] px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#209971] transition-colors duration-300">
                        Get started
                        <div className = 'w-[20%] mt-1'>
                            <img src = {rArrow} alt="Right Arrow" className = 'object-cover'/>
                        </div>
                    </Link>
                </div>


            </div>
        </main>


    </div>
      
  )
}
<div className = ""></div>


export default Homepage
