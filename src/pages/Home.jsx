import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from '../App'
import axios from "axios";
import qs from 'qs'
import {list} from "../components/Sort";

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

function Home() {
    const { categoryId, sort, currentPage } = useSelector(state => state.filter)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const onClickCategory = (id) => dispatch(setCategoryId(id))
    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    useEffect(()=>{
        setIsLoading(true)
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const search = searchValue ?  `search=${searchValue}` : ''

        axios.get(`https://6321b7a6fd698dfa29fd6b7d.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            .then(response => {
                    setItems(response.data)
                    setIsLoading(false)
                }
            )
        window.scrollTo(0,0)
    },[categoryId, sortType, searchValue, currentPage])

    useEffect(()=>{
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
        })
        navigate(`?${queryString}`)
    }, [categoryId, sortType, searchValue, currentPage])

    useEffect(()=>{
      if(window.location.search){
          const params = qs.parse(window.location.search.substring(1))
          const sort = list.find(obj=>obj.sortProperty===params.sortProperty)
          dispatch(
              setFilters({
                  ...params,
                  sort
              })
          )
      }
    },[])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, i)=><Skeleton key={i}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading ? skeletons : pizzas }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
}

export default Home;
