<?php require_once "dash_top_usuarios.php" ?>

<div class="container top">
	<h3 id="contratoDetR"></h3>
    <h6 id="clienteDetR"></h6>
    <h6 id="cerealDetR"></h6>
    <h6 id="compradorDetR"></h6>
    <h6 id="corredorDetR"></h6>
    <h6 id="toneladasDetR"></h6>
    <h6 id="cantCamionesDetR"></h6>
    <h6 id="netosSumadosDetR"></h6>
    <h6 id="netosFinalesSumadosDetR"></h6>
</div>  

<br>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaContratoDetalleRead" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idCamion</th>
                            <th>C.P.</th>
                        	<th>Peso Proc.</th>
                            <th>Patente</th>
                            <th>GRANEL</th>
                            <th>Bruto</th>
                            <th>Tara</th>
                            <th>Neto</th>
                            <th>Hdad</th>
                            <th>Merma</th>
                            <th>Desc</th>
                            <th>NetoFinal</th>
                            <th>Observaciones</th>
                            <th>Fecha</th>
                            <th>Acciones</th>                               
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
        </div>
    </div>  
</div>

<!--Modal para Detalle Camion-->
<div class="modal fade" id="modalContratoDRead" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerContratoDRead">
        <h5 class="modal-title" id="titleContratoDRead"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
    </div>
      <div class="modal-body">
        <div class="table-responsive">
            <table class="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Patente</th>
                        <td id="info00ContratoDRead"></td>
                    </tr>
                    <tr>
                        <th scope="row">Granel</th>
                        <td id="info01ContratoDRead"></td>
                    </tr>
                    <tr>
                        <th scope="row">Observaciones</th>
                        <td id="info02ContratoDRead"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">OK</button>
    </div>
    </div>
  </div>
</div>

<?php require_once "dash_bottom.php" ?>