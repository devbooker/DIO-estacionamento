(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
            limpar();
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const tr = document.createElement("tr");
            tr.innerHTML = `
          <td>${veiculo.nome}</td>
          <td>${veiculo.placa}</td>
          <td>${veiculo.entrada}</td>
          <td><button class="delete" data-placa="${veiculo.placa}">Deletar</button></td>`;
            (_a = tr.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(veiculo.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(tr);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function calcTempo(mil) {
            const min = Math.floor(mil / 60000);
            const sec = Math.floor((mil % 60000) / 1000);
            return `${min}m e ${sec}s`;
        }
        function remover(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function limpar() {
            $("#nome").value = "";
            $("#placa").value = "";
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            const carros = ler();
            if (carros.length) {
                carros.map(veiculo => patio().adicionar(veiculo));
            }
        }
        return { ler, salvar, adicionar, remover, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() }, true);
    });
})();
