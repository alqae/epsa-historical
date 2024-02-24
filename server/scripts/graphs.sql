-- GRAPH FOR LINES
SELECT
    dbo.Lineas.Nombre,
    SUM(dbo.HistoricoConsumos.Costo) AS totalCosto,
    SUM(dbo.HistoricoConsumos.Consumo) AS totalConsumo,
    SUM(dbo.HistoricoConsumos.Perdida) AS totalPerdida
FROM
    dbo.HistoricoConsumos
LEFT JOIN dbo.Lineas ON dbo.Lineas.id = dbo.HistoricoConsumos.idLinea
-- WHERE dbo.HistoricoConsumos.fecha >= '2010-01-01' AND dbo.HistoricoConsumos.fecha <= '2015-01-01'
GROUP BY dbo.Lineas.nombre
ORDER BY dbo.Lines.nombre;

----------------------------------------------------------------------------------------------------

-- GRAPH FOR CLIENTS
-- SELECT
--     dbo.Tipo_clientes.nombre,
--     SUM(dbo.HistoricoConsumos.Costo) AS totalCosto,
--     SUM(dbo.HistoricoConsumos.Consumo) AS totalConsumo,
--     SUM(dbo.HistoricoConsumos.Perdida) AS totalPerdida
-- FROM
--     dbo.HistoricoConsumos
-- LEFT JOIN dbo.Tipo_clientes ON dbo.Tipo_clientes.id = dbo.HistoricoConsumos.idLinea
-- -- WHERE dbo.HistoricoConsumos.fecha >= '2010-01-01' AND dbo.HistoricoConsumos.fecha <= '2015-01-01'
-- WHERE dbo.Tipo_clientes.id > 0
-- GROUP BY dbo.Tipo_clientes.nombre
-- ORDER BY dbo.Tipo_clientes.nombre
