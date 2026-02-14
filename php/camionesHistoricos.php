<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container top">
	<h2>Camiones Históricos</h2>
</div>    
<br>  

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaCamionesH" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idCamion</th>
                            <th>Contrato</th>
                            <th>Carta Porte</th>
                            <th>Peso Proc</th>
                            <th>Patente</th>
                            <th>Granel</th>
                            <th>Bruto</th>
                            <th>Tara</th>
                            <th>Neto</th>
                            <th>Hdad</th>
                            <th>Merma</th>
                            <th>Desc</th>
                            <th>Neto Final</th>
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
<div class="modal fade" id="modalDetalleH" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerDetalleH">
                    <h5 class="modal-title" id="titleDetalleH">Detalle</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </div>
        <div class="modal-body">
            <div class="table-responsive">
                <table class="table table-hover table-bordered table-striped">
                    <tbody>
                        <tr>
                           <th scope="row">Patente</th>
                           <td id="info00CamionH"></td>
                        </tr>
                        <tr>
                           <th scope="row">Granel</th>
                           <td id="info01CamionH"></td>
                       </tr>
                        <tr>
                            <th scope="row">Observaciones</th>
                            <td id="info02CamionH"></td>
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
<!----------------------------->

<?php require_once "dash_bottom.php" ?>