import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { InquiryInterface } from "./InquiryInterface";

// postNum: 한 페이지의 글 갯수
// pageNumCnt: 표시되는 페이징 번호 갯수
type PagenationData = {
    lastInquiryNumber: number | undefined;
    firstInquiryNumber: number | undefined;
}

//페이지 첫 글 번호와 마지막 글 번호, 반환형을 인터페이스 pagenationData로
function getPagenationData(currentPage:number): PagenationData {
    const inquiriesPerPage=10;
    console.log('currentPage', currentPage);
    const lastInquiryNumber= (currentPage * inquiriesPerPage);
    const firstInquiryNumber= (lastInquiryNumber - inquiriesPerPage);
    
    return { lastInquiryNumber: lastInquiryNumber
        ,firstInquiryNumber: firstInquiryNumber}
   
}


export function GetPostsLoaded(props: Array<InquiryInterface>, currentPage:number) {
    console.log("props", props)
    const paginationData = getPagenationData(currentPage);
    const loadedInquires = props.slice(paginationData.firstInquiryNumber, paginationData.lastInquiryNumber)
    return loadedInquires;
}


type pageNumbers = {
    currentPage:number
    totalInquiry:number
    setCurrentPage:any
 }

export function PageNumbers (pageNumbers:pageNumbers){  
    const postNum = 10;
    const pageNumCnt = 10;
    console.log(pageNumbers);
    const totalPages:number = Math.ceil( pageNumbers.totalInquiry/postNum) ; 
    const pagenums: Array<number> = [pageNumbers.currentPage];
    const pageNums = [];
    for (let i = 1; i<= totalPages; i++) {
        pageNums.push(i)
    }

    return( 
        <div className ="row" style={{textAlign:"center"}} >
            <nav className="pagination" aria-label="pagination" style={{width: "auto", margin:"auto"}}>
                {pageNums.map(number => (
                    <li key={number } >
                        <div
                        role="presentaton"
                        onClick={() => pageNumbers.setCurrentPage(number)}
                        className="page-link"> 
                        {number}
                        </div>
                    </li>
                ))}
            </nav>
        </div>
        )    //현재페이지가 10의 배수일 때 
  
}
