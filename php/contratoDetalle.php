<?php require_once "dash_top.php" ?>

<div class="container top">
	<h3 id="contratoDet"></h3>
    <h6 id="clienteDet"></h6>
    <h6 id="cerealDet"></h6>
    <h6 id="compradorDet"></h6>
    <h6 id="corredorDet"></h6>
    <h6 id="toneladasDet"></h6>
    <h6 id="cantCamionesDet"></h6>
    <h6 id="netosSumadosDet"></h6>
    <h6 id="netosFinalesSumadosDet"></h6>
</div>  

<br>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaContratoDetalle" class="table table-striped table-bordered table-condensed" style="width:100%">
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
<div class="modal fade" id="modalContratoD" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerContratoD">
        <h5 class="modal-title" id="titleContratoD"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
    </div>
      <div class="modal-body">
        <div class="table-responsive">
            <table class="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Patente</th>
                        <td id="info00ContratoD"></td>
                    </tr>
                    <tr>
                        <th scope="row">Granel</th>
                        <td id="info01ContratoD"></td>
                    </tr>
                    <tr>
                        <th scope="row">Observaciones</th>
                        <td id="info02ContratoD"></td>
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