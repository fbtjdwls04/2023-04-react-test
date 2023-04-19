import ProductListItem from "./ProductListItem";
export default function ProdList({className}) {

  return (
    <>
      <div className={className}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[20px]">  
          <ProductListItem imgNo={1} name="PRODUCT 1" price="100,000"/>
          <ProductListItem imgNo={2} name="PRODUCT 1" price="200,000"/>
          <ProductListItem imgNo={3} name="PRODUCT 1" price="300,000"/>
          <ProductListItem imgNo={4} name="PRODUCT 1" price="400,000"/>
          <ProductListItem imgNo={5} name="PRODUCT 1" price="500,000"/>
          <ProductListItem imgNo={6} name="PRODUCT 1" price="600,000"/>
          <ProductListItem imgNo={7} name="PRODUCT 1" price="600,000"/>
          <ProductListItem imgNo={8} name="PRODUCT 1" price="600,000"/>
      </ul>
      </div>
    </> 
  );
}

