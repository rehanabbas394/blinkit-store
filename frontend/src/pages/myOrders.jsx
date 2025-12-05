import React from "react";
import { useSelector } from "react-redux";
import NoData from "../component/noData";
import { DisplayPriceInRupees } from "../utils/priceWithDiscount";
import { Link } from "react-router-dom";

function MyOrders() {
    const orders = useSelector(state => state.order?.order || []);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className='bg-white shadow-md p-4 rounded mb-6'>
                <h1 className='text-xl font-semibold'>My Orders</h1>
                <p className='text-sm text-neutral-500'>Recent orders and details</p>
            </div>

            {!orders[0] && (
                <NoData />
            )}

            <div className='grid gap-4 md:grid-cols-2'>
                {orders.map((order, index) => {
                    const product = order?.product_details || {};
                    const image = (product.image && product.image[0]) || '/vite.svg';
                    const name = product.name || 'Product';
                    const qty = order?.quantity || 1;
                    const orderDate = order?.createdAt ? new Date(order.createdAt).toLocaleString() : '';
                    const status = order?.status || 'Delivered';
                    const total = order?.totalAmt ?? 0;

                    return (
                        <div key={(order._id || index) + "-order"} className='bg-white rounded shadow p-4 flex gap-4 items-start'>
                            <img src={image} alt={name} className='w-20 h-20 object-cover rounded' />

                            <div className='flex-1'>
                                <div className='flex justify-between items-start gap-4'>
                                    <div>
                                        <p className='text-sm text-neutral-500'>Order No: <span className='font-medium'>{order?.orderId}</span></p>
                                        <h3 className='font-semibold text-lg'>{name}</h3>
                                        <p className='text-sm text-neutral-500 mt-1'>{orderDate}</p>
                                    </div>

                                    <div className='text-right'>
                                        <div className={`inline-block px-3 py-1 text-xs rounded ${status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {status}
                                        </div>
                                        <p className='font-semibold mt-2'>{DisplayPriceInRupees(total)}</p>
                                    </div>
                                </div>

                                <div className='mt-3 flex items-center justify-between'>
                                    <div className='text-sm text-neutral-600'>Qty: <span className='font-medium'>{qty}</span></div>
                                    <div className='flex items-center gap-2'>
                                        <Link to={`/`} className='text-sm px-3 py-1 border rounded hover:bg-neutral-100'>View details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders;