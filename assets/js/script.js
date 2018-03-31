(function (window, document) {
    "use strict";

    $("#date").mask("00/00/0000");
    var table = $("#tableList").DataTable({
        language: {
            emptyTable: "Nenhum registro encontrado",
            info: "Exibindo _START_ até _END_ de _TOTAL_ registros",
            infoEmpty: "Exibindo 0 registros",
            lengthMenu: "Exibir _MENU_ registros",
            infoFiltered: "(máximo de _MAX_ registros)",
            search: "Pesquisar:",
            paginate: {
                first: "Primeiro",
                last: "Último",
                next: "Próximo",
                previous: "Anterior"
            },
            zeroRecords: "Nenhum registro encontrado"
        },
        scrollX: true,
        scrollCollapse: true,
        columns: [
            {
                title: "Nome",
                data: "name",
            },
            {
                title: "Email",
                data: "email"
            },
            {
                title: "Data de Nascimento",
                data: "date"
            }
        ],
        data: [
            {
                name: "Mateus Larrubia",
                email: "mateus.larrubia99@gmail.com",
                date: "30/04/1999"
            },
            {
                name: "Mateus Larrubia",
                email: "40015@alunos.bandtec.com.br",
                date: "30/04/1999"
            }
        ]
    });

    $("#form").submit(onSubmitHandler);

    $("#modalRegister").on("hidden.bs.modal", function hiddenModalHandler(e) {
        $(e.currentTarget).find("input").val("");
    });

    function onSubmitHandler(e) {
        e.preventDefault();

        if (validate()) {
            table.row.add({
                name: $("#name").val(),
                email: $("#email").val(),
                date: $("#date").val()
            }).draw();
            $("#modalRegister").modal("hide");
            return true;
        }

        return false;
    }

    function validate() {
        // INSIRA A VALIDACAO AQUI
        return true;
    }
})(window, document);