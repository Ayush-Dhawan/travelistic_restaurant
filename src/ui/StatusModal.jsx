import React, { useState } from 'react'
import useUpdateOrderStatusById from '../features/orders/useUpdateOrderStatusById';

export default function StatusModal({id, status}) {
    const color = status === 'cooking your meal' ? 'bg-red-400' : 'bg-blue-400'

    const {updateStatus} = useUpdateOrderStatusById();

    const [newStatus, setNewStatus] = useState('');

    const handleConfirm = (event) => {
        event.preventDefault();
        console.log(newStatus)
        // Add your confirm logic here
        if(newStatus === '') return;
        updateStatus({order_id: id, newStatus});

        const dialog = document.getElementById(`modal-${id}`);
        if (dialog) {
            dialog.close();
        }
    };

    const handleClose = (event) => {
        event.preventDefault();
        const dialog = document.getElementById(`modal-${id}`);
        if (dialog) {
            dialog.close();
        }
    };


  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button onClick={()=>document.getElementById(`modal-${id}`).showModal()} className={`p-1 rounded-xl ${color} text-gray-300 font-semibold w-36`}>{status}</button>
<dialog id={`modal-${id}`} className="modal ">
  <div className="modal-box bg-slate-900">
    
    <div className="modal-action bg-transparent flex flex-col bg-slate-900">
        <h2 className='font-bold text-2xl text-gray-300 bg-slate-900'>Update status <span className='text-sm text-gray-500 bg-slate-900'>of order: {id}</span></h2>
        <div className='flex items-center justify-evenly h-36 bg-slate-900'>
            <input type="radio" onClick={() => setNewStatus('cooking your meal')} name="radio-2" className="radio radio-error bg-slate-900" /> <span className='text-red-400 bg-slate-900'>cooking your meal</span>
            <input type="radio" onClick={() => setNewStatus('left for delivery')} name="radio-2" className="radio radio-primary bg-slate-900" /> <span className='text-blue-400 bg-slate-900'>left for delivery</span>
            <input type="radio" onClick={() => setNewStatus('delivered')} name="radio-2" className="radio radio-accent bg-slate-900" /> <span className='text-green-400 bg-slate-900'>delivered</span>
        </div>
      <form className="dialog bg-transparent w-[95%] flex justify-end ">
        {/* if there is a button in form, it will close the modal */}
        <div className='flex justify-end bg-slate-900'>
        <button onClick={handleConfirm} className=" p-2 m-2 rounded-md bg-green-500 text-gray-800">Confirm</button>
        <button onClick={handleClose} className=" p-2 m-2 rounded-md bg-red-500 text-gray-800">Close</button>
        </div>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}
