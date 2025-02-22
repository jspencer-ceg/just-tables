'use client'
import { useEffect, useState } from "react"
import { Project } from "./types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { ProjectForm } from "./project-form"

async function getData(): Promise<Project[]> {
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:b-vUtTCH/projects', {
      headers: {
        'Authorization': `Bearer ${process.env.XANO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    
    // Transform Xano data to match Project type
    return data.map((item: any) => ({
      id: item.id.toString(),
      project_name: item.project_name,
      project_start: item.project_start,
      project_end: item.project_end,
      location: item.location,
      deploy_status: item.deploy_status,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result)
    }
    fetchData()
  }, [])

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingProject(undefined)
    // Refresh data after closing the modal
    getData().then(setData)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Project
        </Button>
      </div>
      <DataTable columns={columns(handleEdit)} data={data} />
      <ProjectForm 
        open={isModalOpen}
        onClose={handleClose}
        initialData={editingProject}
      />
    </div>
  )
}
