import { criarStore } from './state/store.js';
import { aviso } from './ui/aviso.js';
import { tutorService } from './services/tutorService.js';
import { petService } from './services/petService.js';
import { tutorView } from './ui/tutorView.js';
import { petView } from './ui/petView.js';

const tutores = criarStore({ status: 'carregando', tutores: [], erro: null, editandoId: null, salvando: false });
const pets = criarStore({ status: 'carregando', pets: [], erro: null, editandoId: null, salvando: false });
tutores.assinar(tutorView.render);
pets.assinar(petView.render);

// A relação tutor → pet abastece o <select> e os nomes da tabela de pets.
tutores.assinar((estado) => {
  petView.preencherTutores(estado.tutores);
  petView.render(pets.get());
});

async function carregarTutores() {
  tutores.set({ status: 'carregando', erro: null });
  try {
    const lista = await tutorService.listar();
    tutores.set({ status: lista.length ? 'sucesso' : 'vazio', tutores: lista });
  } catch (e) { tutores.set({ status: 'erro', erro: e.message }); }
}

async function salvarTutor(dados) {
  const { editandoId } = tutores.get(); aviso.limpar(); tutores.set({ salvando: true });
  try {
    if (editandoId) await tutorService.atualizar(editandoId, dados);
    else await tutorService.criar(dados);
    aviso.sucesso(editandoId ? 'Tutor atualizado.' : 'Tutor cadastrado.');
    tutorView.limparForm(); tutores.set({ editandoId: null }); await carregarTutores();
  } catch (e) { aviso.erro(e.message); }
  finally { tutores.set({ salvando: false }); }
}

function editarTutor(id) {
  const tutor = tutores.get().tutores.find((item) => item.id === id);
  if (!tutor) return;
  tutorView.preencherForm(tutor); tutores.set({ editandoId: id });
}
function cancelarEdicaoTutor() { tutorView.limparForm(); tutores.set({ editandoId: null }); }
async function removerTutor(id) {
  if (!confirm(`Remover o tutor #${id}?`)) return;
  aviso.limpar();
  try {
    await tutorService.remover(id); aviso.sucesso('Tutor removido.');
    if (tutores.get().editandoId === id) cancelarEdicaoTutor(); await carregarTutores();
  } catch (e) { aviso.erro(e.message); }
}

async function carregarPets() {
  pets.set({ status: 'carregando', erro: null });
  try {
    const lista = await petService.listar();
    pets.set({ status: lista.length ? 'sucesso' : 'vazio', pets: lista });
  } catch (e) { pets.set({ status: 'erro', erro: e.message }); }
}

async function salvarPet(dados) {
  const { editandoId } = pets.get(); aviso.limpar(); pets.set({ salvando: true });
  try {
    if (editandoId) await petService.atualizar(editandoId, dados);
    else await petService.criar(dados);
    aviso.sucesso(editandoId ? 'Pet atualizado.' : 'Pet cadastrado.');
    petView.limparForm(); pets.set({ editandoId: null }); await carregarPets();
  } catch (e) { aviso.erro(e.message); }
  finally { pets.set({ salvando: false }); }
}

function editarPet(id) {
  const pet = pets.get().pets.find((item) => item.id === id);
  if (!pet) return;
  petView.preencherForm(pet); pets.set({ editandoId: id });
}
function cancelarEdicaoPet() { petView.limparForm(); pets.set({ editandoId: null }); }
async function removerPet(id) {
  if (!confirm(`Remover o pet #${id}?`)) return;
  aviso.limpar();
  try {
    await petService.remover(id); aviso.sucesso('Pet removido.');
    if (pets.get().editandoId === id) cancelarEdicaoPet(); await carregarPets();
  } catch (e) { aviso.erro(e.message); }
}

tutorView.aoEnviar(salvarTutor);
tutorView.aoCancelar(cancelarEdicaoTutor);
tutorView.aoRecarregar(carregarTutores);
tutorView.aoClicarNaLista({ editar: editarTutor, remover: removerTutor });
petView.aoEnviar(salvarPet);
petView.aoCancelar(cancelarEdicaoPet);
petView.aoRecarregar(carregarPets);
petView.aoClicarNaLista({ editar: editarPet, remover: removerPet });

carregarTutores();
carregarPets();
