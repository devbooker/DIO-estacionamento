interface Veiculo {
  nome: string;
  placa: string;
  entrada: Date | string;
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
      document.querySelector(query);

  function patio() {

      function ler(): Veiculo[] {
          return localStorage.patio ? JSON.parse(localStorage.patio) : [];
      }

      function salvar(veiculos: Veiculo[]) {
        localStorage.setItem("patio", JSON.stringify(veiculos));
        limpar();
    }

      function adicionar(veiculo: Veiculo, salva?: boolean) {
          const tr = document.createElement("tr");

          tr.innerHTML = `
          <td>${veiculo.nome}</td>
          <td>${veiculo.placa}</td>
          <td>${veiculo.entrada}</td>
          <td><button class="delete" data-placa="${veiculo.placa}">Deletar</button></td>`;

          tr.querySelector('.delete')?.addEventListener('click', function(){
              remover(veiculo.placa);
          })

          $("#patio")?.appendChild(tr);

          if (salva) salvar([...ler(), veiculo]);
      }

      

      function calcTempo(mil: number) {
          const min = Math.floor(mil / 60000);
          const sec = Math.floor((mil % 60000) / 1000);
  
          return `${min}m e ${sec}s`;
      }

      function remover(placa: string) {
          
          const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);

          const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

          if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;

          salvar(ler().filter((veiculo) => veiculo.placa !== placa));
          render();
      }

      function limpar() {
          $("#nome")!.value="";
          $("#placa")!.value="";
          render();
       }

      function render() {
          $("#patio")!.innerHTML = "";
          
          const carros = ler();

          if (carros.length) {
              carros.map(veiculo => patio().adicionar(veiculo));
          }
      }

      return { ler, salvar, adicionar, remover, render };
}

      patio().render();

      $("#cadastrar")?.addEventListener("click", () => {
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;
  
        if(!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
  
        patio().adicionar({ nome, placa, entrada: new Date() }, true);
    });

})();