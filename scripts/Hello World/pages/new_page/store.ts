import {
  useMemo,
  useState,
  createContext,
} from "scripting"
import {
  MyInfo,
} from "../../common/types"

function useMyInfo(
  initialMyInfo: MyInfo
) {
  const [ name, setName ] = useState(initialMyInfo.name)
  const [ age, setAge ] = useState(initialMyInfo.age)
  const [ email, setEmail ] = useState(initialMyInfo.email)

  const nameAndAge = useMemo(() => {
    return `${name} ${age}`
  }, [name, age])

  return {
    name,
    age,
    email,
    nameAndAge,
    setName,
    setAge,
    setEmail,
  }
}

export type MyInfoStore = ReturnType<
  typeof useMyInfo
>

export const MyInfoContext =
  createContext<MyInfoStore>()

export function MyInfoProvider({
  children,
  initialMyInfo,
}: {
  initialMyInfo: MyInfo
  children: JSX.Element
}) {
  const store = useMyInfo(initialMyInfo)

  return (
    <MyInfoContext.Provider value={store}>
      {children}
    </MyInfoContext.Provider>
  )
}