export class PetAPI {
  addPet(body: any) {
    return body;
  }
  updatePet(body: any) {
    return body;
  }
  findPetsByStatus(status: string[]) {
    return "/" + status;
  }
  findPetById(petId: string) {
    return "/" + petId;
  }
  updatePetFormData() {}
  deletePet(petId: string) {
    return "/" + petId;
  }
}
