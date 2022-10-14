import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import qs from 'qs'
import {list} from "../components/Sort";
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import {fetchPizzas} from "../redux/slices/pizzaSlice";

function Home() {
    const { categoryId, sort, currentPage, searchValue } = useSelector(state => state.filter)
    const {status, items} = useSelector(state => state.pizza)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onClickCategory = (id) => dispatch(setCategoryId(id))
    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }
const getPizzas = async () => {

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const order = sortType.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.replace('-', '')
    const search = searchValue ?  `search=${searchValue}` : ''

        dispatch(fetchPizzas({
            currentPage,category, order, sortBy, search
        }))

    window.scrollTo(0,0)
}
    useEffect(()=>{
      getPizzas()

    },[])

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
                { status==='loading' ? skeletons : pizzas }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
}

export default Home;
