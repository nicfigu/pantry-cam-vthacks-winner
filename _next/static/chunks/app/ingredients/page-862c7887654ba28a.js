(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{6109:function(e,t,n){Promise.resolve().then(n.bind(n,323))},323:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var s=n(7437),r=n(2265),l=function(){let[e,t]=(0,r.useState)(!1),[n,l]=(0,r.useState)([]);(0,r.useEffect)(()=>((()=>{let e=JSON.parse(localStorage.getItem("ings_string"))||[];JSON.parse(localStorage.getItem("spices_string")),JSON.parse(localStorage.getItem("diets_string")),JSON.parse(localStorage.getItem("health_string")),l(e),console.log(e),t(e.length>0)})(),window.addEventListener("storage",o),()=>{window.removeEventListener("storage",o)}),[]);let o=e=>{if("ings_string"===e.key){let e=JSON.parse(localStorage.getItem("ings_string"))||[];console.log("new: ",e),l(e),t(e.length>0)}};return(0,s.jsx)("div",{className:"flex flex-col h-screen w-screen bg-[#3b3b3b]",children:(0,s.jsxs)("div",{className:"flex-grow mt-16",children:[(0,s.jsx)("iframe",{src:"/ing_page/ingpage.html",className:"w-full h-full border-none",title:"Ingredients Page"}),(0,s.jsxs)("div",{className:"text-white text-center text-2xl absolute bottom-[35%] left-4 right-4",children:["Snap a photo of your options! Let"," ",(0,s.jsx)("span",{className:"font-bold bg-gradient-to-r from-[#a52852] to-[#E5751F] inline-block text-transparent bg-clip-text",children:"machine learning"})," ","do the rest."]})]})})};function o(){return(0,s.jsx)(l,{})}}},function(e){e.O(0,[971,23,744],function(){return e(e.s=6109)}),_N_E=e.O()}]);