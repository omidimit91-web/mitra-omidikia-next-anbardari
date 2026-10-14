import { getProducts, deleteProduct } from "./product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ProductForm from "./productForm";


function Products() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const limit = 3;
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [name]);
  const { isLoading, data, isError } = useQuery({
    queryKey: ["products", page, limit, debouncedName],
    queryFn: () =>
      debouncedName
        ? getProducts(1, 1000, debouncedName)
        : getProducts(page, limit, ""),
  });
  if (isLoading) {
    return <p>در حال دریافت محصولات</p>;
  }
  if (isError) {
    return <p>خطا در دریافت محصولات</p>;
  }

  const pageNumbers =
    page < data.totalPages ? [page, page + 1] : [page - 1, page];
  console.log(data.data);
  return (
    <>
      <input
        type="text"
        placeholder="جستجوی محصول..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => deleteMutation.mutate(product.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!debouncedName && (
        <>
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            صفحه قبل
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              disabled={pageNumber === page}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= data.totalPages}
          >
            صفحه بعد
          </button>

          <p>
            صفحه{data.page}از{data.totalPages}
          </p>
        </>
      )}
      <ProductForm />
    </>
  );
}

export default Products;
