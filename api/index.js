import axios from "axios";

export const getUbikeInfo = async () => {
  //  const { data } = await axios.get('https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json?page=0&size=200');
  //  console.log("get ubike data");
  //  return data;
  try{
    const url='https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json?page=0&size=100';
    const res=await fetch(url);
    const data =await res.json();
    return(data);
  }catch(error){
    // console.log("ERROR");
    console.error('Error!!!');
  }

 };
