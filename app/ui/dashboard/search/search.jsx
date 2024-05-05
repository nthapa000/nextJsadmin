"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from 'use-debounce'

const Search = ({placeholder}) => {
  const searchParams = useSearchParams()
  const {replace} = useRouter();
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((e)=>{
    const params = new URLSearchParams(searchParams)

    if(e.target.value){
      // searching for every character can be expensive hence we will search only if we have more than three character , we can also add debounce 
      // using debounce library 
      // to prevent database abuse
      e.target.value.length > 2 && params.set("q",e.target.value);
    }else{
      params.delete("q")
    }
    replace(`${pathname}?${params}`)
    // using this query we can refetch the users
  },400)

  return (
    <div className={styles.container}>
        <MdSearch></MdSearch>
        <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch}/>
    </div>
  )
}

export default Search