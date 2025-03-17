const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'deploymentvote',
    description: 'Starts a deployment vote requiring a certain number of votes.',
    options: [
        {
            name: 'votes',
            type: 4, // Integer
            description: 'Number of votes required to approve the deployment',
            required: true
        }
    ],
    async execute(interaction) {
        const requiredVotes = interaction.options.getInteger('votes');
        let currentVotes = 0;
        let votedUsers = new Set();

        // 🚨 CHECK IF USER HAS A SPECIFIC ROLE BEFORE STARTING THE VOTE 🚨
        const requiredRoleId = '1351170771673808969';  // Replace with the actual role ID
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: '❌ You do not have permission to start a deployment vote!', ephemeral: true });
        }

        // 🎯 PING A SPECIFIC ROLE WHEN THE VOTE STARTS
        const voteRoleId = '1332980229886705685'; // Replace with the role ID you want to notify
        const voteRoleMention = `<@&${voteRoleId}>`;  // Formats the role ping correctly

        const embed = new EmbedBuilder()
            .setColor(129936)
            .setTitle('**Deployment Vote Started!**')
            .setDescription(`${voteRoleMention}, a deployment vote has started! React with ✅ to vote.\n\n**Votes Required:** ${requiredVotes}\n**Current Votes:** ${currentVotes}`);

        const message = await interaction.reply({ content: voteRoleMention, embeds: [embed], fetchReply: true });

        await message.react('✅');

        const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;
        const collector = message.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            if (!votedUsers.has(user.id)) {
                votedUsers.add(user.id);
                currentVotes++;

                const updatedEmbed = new EmbedBuilder()
                    .setColor(129936)
                    .setTitle('**Deployment Vote Started!**')
                    .setDescription(`${voteRoleMention}, a deployment vote has started! React with ✅ to vote.\n\n**Votes Required:** ${requiredVotes}\n**Current Votes:** ${currentVotes}`);

                await message.edit({ embeds: [updatedEmbed] });

                // ✅ IF REQUIRED VOTES REACHED, START DEPLOYMENT
                if (currentVotes >= requiredVotes) {
                    // 🎯 PING A SPECIFIC ROLE WHEN THE DEPLOYMENT STARTS
                    const deploymentRoleId = '1332980229886705685'; // Replace with the role ID to ping when deployment starts
                    const deploymentRoleMention = `<@&${deploymentRoleId}>`;

                    const deploymentEmbed = new EmbedBuilder()
                        .setColor(129936)
                        .setTitle('**Deployment Approved!**')
                        .setDescription(`${deploymentRoleMention}, the deployment vote has passed! Prepare for deployment.`);

                    await interaction.channel.send({ content: deploymentRoleMention, embeds: [deploymentEmbed] });

                    collector.stop(); // Stop collecting reactions
                }
            }
        });
    }
};
