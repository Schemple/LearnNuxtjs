import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const filePath = join(process.cwd(), '../data/buildings.json')

interface Building {
    id: number;
    name: string;
    address: string;
    representative: string;
    phone: string;
    cccd: string;
    cccdDate: string;
    longtitude: number;
    latitude: number;
}

export async function getBuildings() {
    const data = await readFile(filePath, 'utf-8')
    if (!data) return []
    try {
        return JSON.parse(data)
    } catch (error) {
        throw createError(
            { statusCode: 500, statusMessage: 'Lỗi hệ thống' }
        )
    }
}

export async function getBuildingById(id: number) {
    const data = await getBuildings()
    const building = data.find(b => b.id === id)
    if (!building) throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy' })
    return building
}

export async function saveBuildings(data: Building[]) {
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function addBuilding(building: any) {
    if (!building.name || !building.address || !building.representative || !building.phone || !building.cccd || !building.cccdDate || !building.longtitude || !building.latitude) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid building data' })
    }
    const data = await getBuildings()
    const newId = data.length ? Math.max(...data.map(b => b.id)) + 1 : 1
    const newBuilding = { id: newId, ...building }
    data.push(newBuilding)
    await saveBuildings(data)
    return newBuilding
}

export async function updateBuilding(id: number, updated: any) {
    const data = await getBuildings()  
    const index = data.findIndex(b => b.id === id)
    if (index === -1) throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy tòa nhà' })
    data[index] = { ...data[index], ...updated }
    await saveBuildings(data)
    return data[index]
}

export async function deleteBuilding(id: number) {
    const data = await getBuildings()
    const index = data.findIndex(b => b.id === id)
    if (index === -1) throw createError({ statusCode: 404, message: 'Not found' })
    const removed = data.splice(index, 1)[0]
    await saveBuildings(data)
    return removed
}
