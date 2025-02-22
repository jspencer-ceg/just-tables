import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectFormProps {
  open: boolean
  onClose: () => void
  initialData?: {
    id?: string
    created_at: number
    project_name: string
    project_start: string
    project_end: string
    location: string
    deploy_status: string
  }
}

export function ProjectForm({ open, onClose, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    project_name: initialData?.project_name || '',
    project_start: initialData?.project_start || '',
    project_end: initialData?.project_end || '',
    location: initialData?.location || '',
    deploy_status: initialData?.deploy_status || 'pending',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here - either create or update
    const endpoint = initialData?.id 
      ? `https://x8ki-letl-twmt.n7.xano.io/api:b-vUtTCH/projects/${initialData.id}`
      : 'https://x8ki-letl-twmt.n7.xano.io/api:b-vUtTCH/projects'
      
    const method = initialData?.id ? 'PATCH' : 'POST'
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        onClose()
        // You might want to add a refresh mechanism here
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Project' : 'New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Project Name</Label>
            <Input
              id="project_name"
              type="string"
              value={formData.project_name}
              onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="name">Project Start</Label>
            <Input
              id="project_start"
              type="string"
              value={formData.project_start}
              onChange={(e) => setFormData({ ...formData, project_start: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Project End</Label>
            <Input
              id="project_end"
              type="string"
              value={formData.project_end}
              onChange={(e) => setFormData({ ...formData, project_end: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="status">Deployment Status</Label>
            <Select
              value={formData.deploy_status}
              onValueChange={(value) => setFormData({ ...formData, deploy_status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Deployed">Deployed</SelectItem>
                <SelectItem value="Not Deployed">Not Deployed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}