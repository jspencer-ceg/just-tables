'use client'
import { useEffect, useState } from "react"
import { Payment } from "./types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { PaymentForm } from "./payment-form"

async function getData(): Promise<Payment[]> {
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:-0dSTLDP/items', {
      headers: {
        'Authorization': `Bearer ${process.env.XANO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    
    // Transform Xano data to match Payment type
    return data.map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      amount: item.amount,
      status: item.status,
      email: item.email,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result)
    }
    fetchData()
  }, [])

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingPayment(undefined)
    // Refresh data after closing the modal
    getData().then(setData)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Payment
        </Button>
      </div>
      <DataTable columns={columns(handleEdit)} data={data} />
      <PaymentForm 
        open={isModalOpen}
        onClose={handleClose}
        initialData={editingPayment}
      />
    </div>
  )
}
