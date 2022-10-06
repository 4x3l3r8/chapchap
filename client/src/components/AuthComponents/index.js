import { tw } from "brise";

export const LoginPage = tw.div`
  w-full
  h-screen
  bg-[#f0f2f5]
  flex
  items-center
  justify-center
`

export const LoginWrapper = tw.div`
  flex
  flex-col
  h-auto
  w-5/6
  md:h-4/5
  md:w-4/5
  md:flex-row
`;

export const LeftSplit = tw.div`
  flex
  flex-col
  justify-center
  my-6
  md:my-0
  md:flex-1
`;

export const RightSplit = tw(LeftSplit)`
    py-12
    md:my-0
    bg-white
    md:bg-transparent
`;

export const Logo = tw.h3`
  text-center
  md:text-left
  text-5xl
  md:text-7xl
  font-bold
  text-primary
  mb-6
`;

export const Desc = tw.span`
  text-xl
  text-center
  md:mr-4
  md:text-3xl
  md:text-left
`;

export const LoginForm = tw.form`
h-full
md:h-3/5
flex
flex-col
justify-between
space-y-2
bg-white
p-3
rounded-md
`;

export const LoginButton = tw.button`
  h-12
  md:h-16
  rounded-md
  border-0
  bg-primary
  text-white
  text-xl
  md:text-3xl
  font-bold
  cursor-pointer
  my-4
  ${(props) => props.disabled && "opacity-[0.7564] bg-[#377fdd34]"}
`;

export const RegisterButton = tw(LoginButton)`
  w-4/6
  self-center
  bg-secondary
  text-2xl
`;

export const ForgotLink = tw.a`
  text-center
  text-primary
`;

export const LoginInput = tw.input`
  h-14
  md:h-20
  rounded-lg
  border-gray-700
  focus:outline-none
`;

export const LoginError = tw.div`
  h-14
  rounded-md
  border-2
  border-rose-500
  bg-[#fc8787]
  text-lg
  text-white
  p-1
  text-center
`